﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace magicsim
{
    /// <summary>
    /// Interaction logic for SimQueue.xaml
    /// </summary>
    public partial class SimQueue : Window
    {
        public List<Model> models;
        public SimQueue()
        {
            SubMainWindow.isActive = false;
            InitializeComponent();
            using (StreamReader r = new StreamReader("Models.json"))
            {
                string json = r.ReadToEnd();
                var context = (SimQueueData)this.DataContext;
                
                List<Model> items = JsonConvert.DeserializeObject<List<Model>>(json);
                models = items;
                items.ForEach((item) =>
                {
                    context.Models.Add(item.dispName);
                });
                context.SelectedModel = context.Models[0];
            }
        }

        public class Model
        {
            public string dispName;
            public string name;
            public Dictionary<string, float> model;
            public Dictionary<string, float> timeModel;

            public Model()
            {
                model = new Dictionary<string, float>();
                timeModel = new Dictionary<string, float>();
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var context = (SimQueueData)this.DataContext;
            context.RemoveSim(((Sim)(((Button)sender)).DataContext).Name);
        }

        private void PantheonUserRemove_Click(object sender, RoutedEventArgs e)
        {
            var pantheon = ((PantheonUser)((Button)sender).DataContext);
            var context = (SimQueueData)this.DataContext;
            context.PantheonUsers.Remove(pantheon);
        }

        private void PantheonUserAdd_Click(object sender, RoutedEventArgs e)
        {
            var context = (SimQueueData)this.DataContext;
            if (context.SelectedPantheonTrinket.Equals("Golganneth's Vitality"))
            {
                var haste = context.PantheonHastePercent / 100.0;
                context.PantheonUsers.Add(new PantheonUser("go:" + haste));
            }
            else if (context.SelectedPantheonTrinket.Equals("Aggramar's Conviction"))
            {
                context.PantheonUsers.Add(new PantheonUser("ag"));
            }
            else if (context.SelectedPantheonTrinket.Equals("Eonar's Compassion"))
            { 
                var haste = context.PantheonHastePercent / 100.0;
                context.PantheonUsers.Add(new PantheonUser("eo:" + haste));
            }
            else if (context.SelectedPantheonTrinket.Equals("Norgannon's Prowess"))
            {
                context.PantheonUsers.Add(new PantheonUser("no"));
            }
            else if (context.SelectedPantheonTrinket.Equals("Khaz'goroth's Courage"))
            {
                context.PantheonUsers.Add(new PantheonUser("kh"));
            }
            else if (context.SelectedPantheonTrinket.Equals("Aman'Thul's Vision"))
            {
                context.PantheonUsers.Add(new PantheonUser("am"));
            }
        }

        private void PantheonTrinket_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var context = (SimQueueData)this.DataContext;
            if(PantheonHaste == null)
            {
                return;
            }
            if (context.SelectedPantheonTrinket.Equals("Golganneth's Vitality") || context.SelectedPantheonTrinket.Equals("Eonar's Compassion"))
            {
                PantheonHaste.IsEnabled = true;
            } else
            {
                PantheonHaste.IsEnabled = false;
            }
        }

        private void PantheonEnable_Unchecked(object sender, RoutedEventArgs e)
        {
            var pantheonHaste = (TextBox)this.FindName("PantheonHaste");
            pantheonHaste.IsEnabled = false;
        }

        private void PantheonEnable_Checked(object sender, RoutedEventArgs e)
        {
            var context = (SimQueueData)this.DataContext;
            var pantheonHaste = (TextBox)this.FindName("PantheonHaste");
            if (PantheonHaste == null)
            {
                return;
            }
            if (context.SelectedPantheonTrinket.Equals("Golganneth's Vitality") || context.SelectedPantheonTrinket.Equals("Eonar's Compassion"))
            {
                pantheonHaste.IsEnabled = true;
            }
            else
            {
                pantheonHaste.IsEnabled = false;
            }
        }

        private void AddCharacter_Click(object sender, RoutedEventArgs e)
        {
            var window = new SubMainWindow();
            App.Current.MainWindow = window;
            this.Close();
            window.Show();
        }

        private string GeneratePantheonString()
        {
            var context = (SimQueueData)this.DataContext;
            if(context.PantheonUsers.Count() == 0)
            {
                return "";
            }
            if (context.PantheonUsers.Count() == 1)
            {
                return context.PantheonUsers[0].Value;
            } else
            {
                var returnVal = context.PantheonUsers[0].Value;
                foreach(var user in context.PantheonUsers.Skip(1))
                {
                    returnVal += "/" + user.Value;
                }
                return returnVal;
            }
        }

        private void Simulate_Click(object sender, RoutedEventArgs e)
        { 
            var context = (SimQueueData)this.DataContext;
            Model selectedModel;
            var potentialMatch = models.Where((model) =>
            {
                return model.dispName.Equals(context.SelectedModel);
            });
            if(potentialMatch.Count()>0)
            {
                selectedModel = potentialMatch.ElementAt(0);
            } else
            {
                return;
            }
            var guid = Guid.NewGuid().ToString().Substring(0, 8);
            var simList = new List<string>();
            foreach (var time in selectedModel.timeModel.Keys)
            {
                foreach(var sim in selectedModel.model.Keys)
                {
                    var simContent = sim.ToLower();
                    var style = simContent.Split('_')[0];
                    var simProfile = "";
                    if(context.PTRMode)
                    {
                        simProfile += "ptr=1";
                    }
                    context.Sims.ToList().ForEach((simChar) =>
                    {
                        var nameRegex = new Regex(simChar.Profile.Split('"')[0] + "\"(\\w+)\"");
                        simChar.Profile = simChar.Profile.Replace(nameRegex.Match(simChar.Profile).Groups[1].Value, simChar.Name);
                        simProfile += simChar.Profile + "\r\n";
                    });
                    simProfile += "iterations=10000\r\nthreads=" + context.Threads + "\r\noptimize_expressions=1\r\nmax_time=" + time + "\r\nvary_combat_length=0.20\r\noptimal_raid=1\r\nfight_style=" + style + "\r\nenemy=enemy1\r\n";
                    if (simContent.Contains("2t"))
                    { 
                        simProfile += "enemy=enemy2\r\nraid_events+=/move_enemy,name=enemy2,cooldown=2000,duration=1000,x=-27,y=-27\r\n";
                    }
                    if (simContent.Contains("sa"))
                    {
                        simProfile += "raid_events+=/adds,count=3,first=45,cooldown=45,duration=10,distance=5\r\n";
                    }
                    if (simContent.Contains("ba"))
                    {
                        simProfile += "raid_events+=/adds,count=1,first=30,cooldown=60,duration=20\r\n";
                    }
                    if (context.DisableStatWeights)
                    {
                        simProfile += "calculate_scale_factors=0\r\n";
                    }
                    else
                    {
                        simProfile += "calculate_scale_factors=1\r\n";
                    }
                    if(context.PantheonTrinketsEnabled)
                    {
                        simProfile += "legion.pantheon_trinket_users=" + GeneratePantheonString();
                    }
                    if(context.ReforgeEnabled)
                    {
                        var reforge_stat = "";
                        if(context.ReforgeCrit)
                        {
                            reforge_stat += "crit";
                        }
                        if(context.ReforgeHaste)
                        {
                            if(reforge_stat.Equals(""))
                            {
                                reforge_stat += "haste";
                            } else
                            {
                                reforge_stat += ",haste";
                            }
                        }
                        if (context.ReforgeMastery)
                        {
                            if (reforge_stat.Equals(""))
                            {
                                reforge_stat += "mastery";
                            }
                            else
                            {
                                reforge_stat += ",mastery";
                            }
                        }
                        if (context.ReforgeVers)
                        {
                            if (reforge_stat.Equals(""))
                            {
                                reforge_stat += "versatility";
                            }
                            else
                            {
                                reforge_stat += ",versatility";
                            }
                        }
                        simProfile += "reforge_plot_stat=" + reforge_stat + "\r\nreforge_plot_amount=" + context.ReforgeAmount + "\r\nreforge_plot_step=" + context.ReforgeStepSize + "\r\n";
                    }
                    
                    var filePrefix = "results/" + guid + "/" + time + "_" + sim + ".";
                    simProfile += "json2=" + filePrefix + "json\r\nhtml=" + filePrefix + "html\r\n";
                    simList.Add(simProfile);
                }
            }
            var window = new SimcRunner();
            ((SimcRunnerData)window.DataContext).LoadSimLoadout(simList, context.Processes, selectedModel);
            App.Current.MainWindow = window;
            this.Close();
            window.Show();
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            var window = new MainWindow();
            App.Current.MainWindow = window;
            SimDataManager.ResetSimData();
            this.Close();
            window.Show();
        }
    }
}
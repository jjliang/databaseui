class DefaultsAndNils < ActiveRecord::Migration
  def up
  	change_column :authors, :first_name, :string, :null => false
  	change_column :authors, :last_name, :string, :null => false
  	change_column :citations, :title, :string, :null => false
  	change_column :citations, :document, :string, :default => nil
  	change_column :citations, :year, :integer, :null => false
  	change_column :citations, :format_title, :string, :default => nil
  	change_column :citations, :publisher, :string, :default => nil
  	change_column :citations, :number, :integer, :default => nil
  	change_column :citations, :volume, :integer, :default => nil
  	change_column :citations, :pages, :string, :default => nil
  	change_column :citations, :closed, :boolean, :null => false, :default => 0
  	change_column :competition_interactions, :stage_1_id, :integer, :null => false
  	change_column :competition_interactions, :stage_2_id, :integer, :null => false
  	#change_column :competition_interaction_observations, :datum, :string, :null => false, :default => ''
  	change_column :facilitation_interactions, :stage_1_id, :integer, :null => false
  	change_column :facilitation_interactions, :stage_2_id, :integer, :null => false
  	#change_column :facilitation_interaction_observations, :datum, :string, :null => false, :default => ''
  	change_column :functional_groups, :name, :string, :null => false
  	change_column :location_data, :latitude, :float, :null => false
  	change_column :location_data, :longitude, :float, :null => false
  	change_column :nodes, :working_name, :string, :null => false
  	change_column :nodes, :is_assemblage, :boolean, :null => false
  	change_column :node_max_ages, :max_age, :float, :null => false
  	change_column :node_max_ages, :datum, :string, :null => false, :default => ''
  	change_column :node_ranges, :location_n_id, :integer, :null => false
  	change_column :node_ranges, :location_s_id, :integer, :null => false
  	change_column :node_ranges, :datum, :string, :null => false, :default => ''
  	change_column :non_itis, :parent_id, :integer, :null => false
  	change_column :non_itis, :latin_name, :string, :null => false
  	change_column :non_itis, :parent_id_is_itis, :boolean, :null => false
  	change_column :parasitic_interactions, :stage_1_id, :integer, :null => false
  	change_column :parasitic_interactions, :stage_2_id, :integer, :null => false
  	#change_column :parasitic_interaction_observations, :prevalence, :float, :default => nil
  	#change_column :parasitic_interaction_observations, :intensity, :float, :default => nil
  	#change_column :parasitic_interaction_observations, :datum, :string, :null => false, :default => ''
  	change_column :stage_biomass_changes, :biomass_change, :float, :null => false
  	change_column :stage_biomass_changes, :datum, :string, :null => false
  	change_column :stage_biomass_densities, :biomass_density, :float, :null => false
  	change_column :stage_biomass_densities, :datum, :string, :null => false, :default => ''
  	change_column :stage_consumer_strategies, :datum, :string, :null => false, :default => ''
  	#change_column :stage_consum_biomass_ratios, :consum_biomass_ratio, :float, :null => false
  	#change_column :stage_consum_biomass_ratios, :datum, :string, :null => false, :default => ''
  	change_column :stage_drymasses, :drymass, :float, :null => false
  	change_column :stage_drymasses, :datum, :string, :null => false, :default => ''
  	change_column :stage_durations, :duration, :float, :null => false
  	change_column :stage_durations, :datum, :string, :null => false, :default => ''
  	change_column :stage_fecundities, :fecundity, :string, :null => false
  	change_column :stage_fecundities, :datum, :string, :null => false, :default => ''
  	change_column :stage_habitats, :datum, :string, :null => false, :default => ''
  	change_column :stage_lengths, :length, :float, :null => false
  	change_column :stage_lengths, :datum, :string, :null => false, :default => ''
  	change_column :stage_length_fecundities, :a, :float, :null => false, :default => 0
  	change_column :stage_length_fecundities, :b, :float, :null => false, :default => 0
  	change_column :stage_length_fecundities, :datum, :string, :null => false, :default => ''
  	change_column :stage_length_weights, :a, :float, :null => false, :default => 0
  	change_column :stage_length_weights, :b, :float, :null => false, :default => 0
  	change_column :stage_length_weights, :datum, :string, :null => false, :default => ''
  	change_column :stage_lifestyles, :datum, :string, :null => false, :default => ''
  	change_column :stage_masses, :mass, :float, :null => false
  	change_column :stage_masses, :datum, :string, :null => false, :default => ''
  	change_column :stage_max_depths, :max_depth, :float, :null => false
  	change_column :stage_max_depths, :datum, :string, :null => false, :default => ''
  	change_column :stage_mobilities, :datum, :string, :null => false, :default => ''
  	change_column :stage_populations, :population, :float, :null => false
  	change_column :stage_populations, :datum, :string, :null => false, :default => ''
  	change_column :stage_prod_biomass_ratios, :prod_biomass_ratio, :float, :null => false
  	change_column :stage_prod_biomass_ratios, :datum, :string, :null => false, :default => ''
  	change_column :stage_prod_consum_ratios, :prod_consum_ratio, :float, :null => false
  	change_column :stage_prod_consum_ratios, :datum, :string, :null => false, :default => ''
  	change_column :stage_reproductive_strategies, :datum, :string, :null => false, :default => ''
  	change_column :stage_residencies, :datum, :string, :null => false, :default => ''
  	change_column :stage_residency_times, :residency_time, :float, :null => false
  	change_column :stage_residency_times, :datum, :string, :null => false, :default => ''
  	change_column :stage_unassimilated_consum_ratios, :unassimilated_consum_ratio, :float, :null => false
  	change_column :stage_unassimilated_consum_ratios, :datum, :string, :null => false, :default => ''
  	change_column :trophic_interactions, :stage_1_id, :integer, :null => false
  	change_column :trophic_interactions, :stage_2_id, :integer, :null => false
  	change_column :trophic_interaction_observations, :percentage_consumed, :float, :default => nil
  	change_column :trophic_interaction_observations, :percentage_diet, :float, :default => nil
  	change_column :trophic_interaction_observations, :datum, :string, :null => false, :default => ''

  end

  def down
  end
end

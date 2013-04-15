class DefaultAndNils < ActiveRecord::Migration
  def up
		# Authors table
  	change_column :authors, :first_name, :string, :null => false
  	change_column :authors, :last_name, :string, :null => false
  	change_column :authors, :user_id, :integer, :null => false
  	change_column :authors, :project_id, :integer, :null => false
  	change_column :authors, :mod, :boolean, :default => true
  	change_column :authors, :approved, :boolean, :default => false
  	
  	# Authors cite table
  	change_column :author_cites, :author_id, :integer, :null => false
  	change_column :author_cites, :citation_id, :integer, :null => false
  	change_column :author_cites, :user_id, :integer, :null => false
  	change_column :author_cites, :project_id, :integer, :null => false
  	change_column :author_cites, :mod, :boolean, :default => true
  	change_column :author_cites, :approved, :boolean, :default => false
  	
  	# Citations table
  	change_column :citations, :title, :string, :null => false
  	change_column :citations, :document, :string, :default => nil
  	change_column :citations, :year, :integer, :null => false
  	change_column :citations, :format, :string, :default => "", :null => false
  	change_column :citations, :format_title, :string, :default => nil
  	change_column :citations, :publisher, :string, :default => nil
  	change_column :citations, :number, :integer, :default => nil
  	change_column :citations, :volume, :integer, :default => nil
  	change_column :citations, :pages, :string, :default => nil
  	change_column :citations, :closed, :boolean, :null => false, :default => false
  	change_column :citations, :user_id, :integer, :null => false
  	change_column :citations, :project_id, :integer, :null => false
  	change_column :citations, :mod, :boolean, :default => true
  	change_column :citations, :approved, :boolean, :default => false
  	
  	# Competition Interactions Table
  	change_column :competition_interactions, :stage_1_id, :integer, :null => false
  	change_column :competition_interactions, :stage_2_id, :integer, :null => false
  	change_column :competition_interactions, :user_id, :integer, :null => false
  	change_column :competition_interactions, :project_id, :integer, :null => false
  	change_column :competition_interactions, :mod, :boolean, :default => true
  	change_column :competition_interactions, :approved, :boolean, :default => false

		# Competition Interaction Observations
  	change_column :competition_interaction_observations, :datum, :string, :null => false, :default => ''
  	change_column :competition_interaction_observations, :citation_id, :integer, :null => false
	change_column :competition_interaction_observations, :competition_interaction_id, :integer, :null => false
  	change_column :competition_interaction_observations, :location_id, :integer, :null => false
  	change_column :competition_interaction_observations, :location_id, :integer, :null => false
  	change_column :competition_interaction_observations, :observation_type, :string, :default => "", :null => false
  	change_column :competition_interaction_observations, :competition_type, :string, :default => nil
		change_column :competition_interaction_observations, :user_id, :integer, :null => false
  	change_column :competition_interaction_observations, :project_id, :integer, :null => false
  	change_column :competition_interaction_observations, :mod, :boolean, :default => true
  	change_column :competition_interaction_observations, :approved, :boolean, :default => false
  	
  	# facilitation_interaction
  	change_column :facilitation_interactions, :stage_1_id, :integer, :null => false
  	change_column :facilitation_interactions, :stage_2_id, :integer, :null => false
  	change_column :facilitation_interactions, :user_id, :integer, :null => false
  	change_column :facilitation_interactions, :project_id, :integer, :null => false
  	change_column :facilitation_interactions, :mod, :boolean, :default => true
  	change_column :facilitation_interactions, :approved, :boolean, :default => false
  	
  	# facilitation_interaction_observations
  	change_column :facilitation_interaction_observations, :datum, :string, :null => false, :default => ''
  	change_column :facilitation_interaction_observations, :citation_id, :integer, :null => false
  	change_column :facilitation_interaction_observations, :facilitation_interaction_id, :integer, :null => false
  	change_column :facilitation_interaction_observations, :location_id, :integer, :null => false
  	change_column :facilitation_interaction_observations, :observation_type, :string, :default => "", :null => false
  	change_column :facilitation_interaction_observations, :facilitation_type, :string, :default => nil
  	change_column :facilitation_interaction_observations, :user_id, :integer, :null => false
  	change_column :facilitation_interaction_observations, :project_id, :integer, :null => false
  	change_column :facilitation_interaction_observations, :mod, :boolean, :default => true
  	change_column :facilitation_interaction_observations, :approved, :boolean, :default => false
  	
  	# functional group table
  	change_column :functional_groups, :name, :string, :null => false
  	change_column :functional_groups, :project_id, :integer, :null => false
  	change_column :functional_groups, :user_id, :integer, :null => false
  	change_column :functional_groups, :mod, :boolean, :default => true, :null => false
  	change_column :functional_groups, :approved, :boolean, :default => false, :null => false
  	# locations table
  	change_column :locations, :name, :string, :null => false
  	change_column :locations, :left, :integer, :null => false
  	change_column :locations, :right, :integer, :null => false
  	change_column :locations, :parent, :integer, :null => false
  	change_column :locations, :active, :boolean, :default => true
  	change_column :locations, :visible, :boolean, :default => true, :null => false
  	change_column :locations, :zoom_max, :integer, :default => 15, :null => false
  	change_column :locations, :zoom_min, :integer, :default => -1, :null => false
  	change_column :locations, :z_index, :integer, :default => 1, :null => false
  	change_column :locations, :user_id, :integer, :null => false
  	change_column :locations, :project_id, :integer, :null => false
  	change_column :locations, :mod, :boolean, :default => true
  	
  	# location_data table
  	#change_column :location_data, :latitude, :decimal, :precision => 64, :scale => 12, :null => false
  	#change_column :location_data, :longitude, :decimal,:precision => 64, :scale => 12, :null => false
  	change_column :location_data, :user_id, :integer, :null => false
  	change_column :location_data, :project_id, :integer, :null => false
  	change_column :location_data, :mod, :boolean, :default => true
  	change_column :location_data, :approved, :boolean, :default => false
  	
  	# nodes table
  	change_column :nodes, :working_name, :string, :null => false
  	change_column :nodes, :is_assemblage, :boolean, :null => false
  	change_column :nodes, :itis_id, :integer, :null => false
  	change_column :nodes, :non_itis_id, :integer, :null => false
  	change_column :nodes, :functional_group_id, :integer, :null => false
  	change_column :nodes, :user_id, :integer, :null => false
  	change_column :nodes, :project_id, :integer, :null => false
  	change_column :nodes, :mod, :boolean, :default => true
  	change_column :nodes, :approved, :boolean, :default => false
  	
  	#node_max_age table
  	change_column :node_max_ages, :max_age, :decimal, :precision => 64, :scale => 12, :null => false
  	change_column :node_max_ages, :datum, :string, :null => false, :default => ''
  	change_column :node_max_ages, :citation_id, :integer, :null => false
  	change_column :node_max_ages, :node_id, :integer, :null => false
  	change_column :node_max_ages, :user_id, :integer, :null => false
  	change_column :node_max_ages, :project_id, :integer, :null => false
  	change_column :node_max_ages, :mod, :boolean, :default => true
  	change_column :node_max_ages, :approved, :boolean, :default => false
  	
  	#node_ranges table
  	change_column :node_ranges, :citation_id, :integer, :null => false
  	change_column :node_ranges, :node_id, :integer, :null => false
  	change_column :node_ranges, :location_n_id, :integer, :null => false
  	change_column :node_ranges, :location_s_id, :integer, :null => false
  	change_column :node_ranges, :datum, :string, :null => false, :default => ''
  	change_column :node_ranges, :user_id, :integer, :null => false
  	change_column :node_ranges, :project_id, :integer, :null => false
  	change_column :node_ranges, :mod, :boolean, :default => true
  	change_column :node_ranges, :approved, :boolean, :default => false
  	
  	# non_itis table
  	change_column :non_itis, :parent_id, :integer, :null => false
  	change_column :non_itis, :latin_name, :string, :null => false
  	change_column :non_itis, :taxonomy_level, :string, :default => "", :null => false
  	change_column :non_itis, :parent_id_is_itis, :boolean, :null => false
  	change_column :non_itis, :user_id, :integer, :null => false
  	change_column :non_itis, :project_id, :integer, :null => false
  	change_column :non_itis, :mod, :boolean, :default => true
  	change_column :non_itis, :approved, :boolean, :default => false
  	
  	# parasitic_interaction
  	change_column :parasitic_interactions, :stage_1_id, :integer, :null => false
  	change_column :parasitic_interactions, :stage_2_id, :integer, :null => false
  	change_column :parasitic_interactions, :user_id, :integer, :null => false
  	change_column :parasitic_interactions, :project_id, :integer, :null => false
  	change_column :parasitic_interactions, :mod, :boolean, :default => true
  	change_column :parasitic_interactions, :approved, :boolean, :default => false
  	
  	# parasitic_interaction_observations
  	change_column :parasitic_interaction_observations, :citation_id, :integer, :null => false
  	change_column :parasitic_interaction_observations, :parasitic_interaction_id, :integer, :null => false
  	change_column :parasitic_interaction_observations, :location_id, :integer, :null => false
  	change_column :parasitic_interaction_observations, :endo_ecto, :string, :default => nil
  	change_column :parasitic_interaction_observations, :lethality, :string, :default => nil
  	change_column :parasitic_interaction_observations, :prevalence, :decimal, :precision => 64, :scale => 12, :default => nil
  	change_column :parasitic_interaction_observations, :intensity, :decimal, :precision => 64, :scale => 12, :default => nil
  	change_column :parasitic_interaction_observations, :parasite_type, :string, :default => nil
  	change_column :parasitic_interaction_observations, :observation_type, :string, :default => "", :null => false
  	change_column :parasitic_interaction_observations, :datum, :string, :null => false, :default => ''
  	change_column :parasitic_interaction_observations, :user_id, :integer, :null => false
  	change_column :parasitic_interaction_observations, :project_id, :integer, :null => false
  	change_column :parasitic_interaction_observations, :mod, :boolean, :default => true
  	change_column :parasitic_interaction_observations, :approved, :boolean, :default => false
  	
  	#Projects table
  	change_column :projects, :name, :string, :null => false
  	change_column :projects, :user_id, :integer, :null => false
  	#change_column :projects, :owner, :integer, :null => false
  	change_column :projects, :approved, :boolean, :default => false
  	change_column :projects, :public, :boolean, :default => false
  	
  	# stages table
  	change_column :stages, :name, :string, :default => "", :null => false
  	change_column :stages, :node_id, :integer, :null => false
  	change_column :stages, :user_id, :integer, :null => false
  	change_column :stages, :project_id, :integer, :null => false
  	change_column :stages, :mod, :boolean, :default => true
  	change_column :stages, :approved, :boolean, :default => false
  	
  	# stage_biomass_changes
  	change_column :stage_biomass_changes, :citation_id, :integer, :null => false
  	change_column :stage_biomass_changes, :stage_id, :integer, :null => false
  	change_column :stage_biomass_changes, :biomass_change, :decimal, :precision => 64, :scale => 12, :null => false
  	change_column :stage_biomass_changes, :datum, :string, :null => false
  	change_column :stage_biomass_changes, :user_id, :integer, :null => false
  	change_column :stage_biomass_changes, :project_id, :integer, :null => false
  	change_column :stage_biomass_changes, :mod, :boolean, :default => true
  	change_column :stage_biomass_changes, :approved, :boolean, :default => false
  	
  	# stage_biomass_densities
  	change_column :stage_biomass_densities, :citation_id, :integer, :null => false
  	change_column :stage_biomass_densities, :stage_id, :integer, :null => false
  	change_column :stage_biomass_densities, :biomass_density, :decimal, :precision => 64, :scale => 12, :null => false
  	change_column :stage_biomass_densities, :datum, :string, :null => false, :default => ''
  	change_column :stage_biomass_densities, :user_id, :integer, :null => false
  	change_column :stage_biomass_densities, :project_id, :integer, :null => false
  	change_column :stage_biomass_densities, :mod, :boolean, :default => true
  	change_column :stage_biomass_densities, :approved, :boolean, :default => false
  	
  	# stage_consumer_strategies
  	change_column :stage_consumer_strategies, :citation_id, :integer, :null => false
  	change_column :stage_consumer_strategies, :stage_id, :integer, :null => false
  	change_column :stage_consumer_strategies, :consumer_strategy, :string, :default => "autotroph", :null => false
  	change_column :stage_consumer_strategies, :datum, :string, :null => false, :default => ''
  	change_column :stage_consumer_strategies, :user_id, :integer, :null => false
  	change_column :stage_consumer_strategies, :project_id, :integer, :null => false
  	change_column :stage_consumer_strategies, :mod, :boolean, :default => true
  	change_column :stage_consumer_strategies, :approved, :boolean, :default => false
  	
  	#stage consum biomass ratios table
  	change_column :stage_consum_biomass_ratios, :citation_id, :integer, :null => false
  	change_column :stage_consum_biomass_ratios, :stage_id, :integer, :null => false
  	change_column :stage_consum_biomass_ratios, :consum_biomass_ratio, :decimal,:precision => 64, :scale => 12, :null => false
  	change_column :stage_consum_biomass_ratios, :datum, :string, :null => false, :default => ''
  	change_column :stage_consum_biomass_ratios, :user_id, :integer, :null => false
  	change_column :stage_consum_biomass_ratios, :project_id, :integer, :null => false
  	change_column :stage_consum_biomass_ratios, :mod, :boolean, :default => true
  	change_column :stage_consum_biomass_ratios, :approved, :boolean, :default => false

  	# stage_drymasses table
  	change_column :stage_drymasses, :citation_id, :integer, :null => false
  	change_column :stage_drymasses, :stage_id, :integer, :null => false
  	change_column :stage_drymasses, :drymass, :decimal,:precision => 64, :scale => 12, :null => false
  	change_column :stage_drymasses, :datum, :string, :null => false, :default => ''
  	change_column :stage_drymasses, :user_id, :integer, :null => false
  	change_column :stage_drymasses, :project_id, :integer, :null => false
  	change_column :stage_drymasses, :mod, :boolean, :default => true
  	change_column :stage_drymasses, :approved, :boolean, :default => false

		#stage_durations table
		change_column :stage_durations, :citation_id, :integer, :null => false
		change_column :stage_durations, :stage_id, :integer, :null => false
  	change_column :stage_durations, :duration, :decimal, :precision => 64, :scale => 12, :null => false
  	change_column :stage_durations, :datum, :string, :null => false, :default => ''
  	change_column :stage_durations, :user_id, :integer, :null => false
  	change_column :stage_durations, :project_id, :integer, :null => false
  	change_column :stage_durations, :mod, :boolean, :default => true
  	change_column :stage_durations, :approved, :boolean, :default => false
  	
  	#stage_fecundities table
  	change_column :stage_fecundities, :citation_id, :integer, :null => false
  	change_column :stage_fecundities, :stage_id, :integer, :null => false
  	change_column :stage_fecundities, :fecundity, :string, :null => false
  	change_column :stage_fecundities, :datum, :string, :null => false, :default => ''
  	change_column :stage_fecundities, :user_id, :integer, :null => false
  	change_column :stage_fecundities, :project_id, :integer, :null => false
  	change_column :stage_fecundities, :mod, :boolean, :default => true
  	change_column :stage_fecundities, :approved, :boolean, :default => false
  	
  	#stage_habitats table
  	change_column :stage_habitats, :citation_id, :integer, :null => false
  	change_column :stage_habitats, :stage_id, :integer, :null => false
  	change_column :stage_habitats, :habitat, :string, :default => "", :null => false
  	change_column :stage_habitats, :datum, :string, :null => false, :default => ''
  	change_column :stage_habitats, :user_id, :integer, :null => false
  	change_column :stage_habitats, :project_id, :integer, :null => false
  	change_column :stage_habitats, :mod, :boolean, :default => true
  	change_column :stage_habitats, :approved, :boolean, :default => false
  	
  	#stage_habitat_descriptors
  	change_column :stage_habitat_descriptors, :descriptor, :string, :null => false
  	change_column :stage_habitat_descriptors, :user_id, :integer, :null => false
  	change_column :stage_habitat_descriptors, :project_id, :integer, :null => false
  	change_column :stage_habitat_descriptors, :mod, :boolean, :default => true
  	change_column :stage_habitat_descriptors, :approved, :boolean, :default => false
  	
  	#stage_lengths table
  	change_column :stage_lengths, :citation_id, :integer, :null => false
  	change_column :stage_lengths, :stage_id, :integer, :null => false
  	change_column :stage_lengths, :length, :decimal, :precision => 64, :scale => 12, :null => false
  	change_column :stage_lengths, :datum, :string, :null => false, :default => ''
  	change_column :stage_lengths, :user_id, :integer, :null => false
  	change_column :stage_lengths, :project_id, :integer, :null => false
  	change_column :stage_lengths, :mod, :boolean, :default => true
  	change_column :stage_lengths, :approved, :boolean, :default => false
  	
  	# stage_length_fecundities
  	change_column :stage_length_fecundities, :citation_id, :integer, :null => false
  	change_column :stage_length_fecundities, :stage_id, :integer, :null => false
  	change_column :stage_length_fecundities, :a, :decimal, :precision => 64, :scale => 12, :null => false, :default => 0
  	change_column :stage_length_fecundities, :b, :decimal, :precision => 64, :scale => 12, :null => false, :default => 0
  	change_column :stage_length_fecundities, :datum, :string, :null => false, :default => ''
  	change_column :stage_length_fecundities, :length_fecundity, :string, :default => "none exists - constant fecundity", :null => false
  	change_column :stage_length_fecundities, :user_id, :integer, :null => false
  	change_column :stage_length_fecundities, :project_id, :integer, :null => false
  	change_column :stage_length_fecundities, :mod, :boolean, :default => true
  	change_column :stage_length_fecundities, :approved, :boolean, :default => false
  	
  	# stage_length_weights
  	change_column :stage_length_weights, :citation_id, :integer, :null => false
  	change_column :stage_length_weights, :stage_id, :integer, :null => false
  	change_column :stage_length_weights, :a, :decimal, :precision => 64, :scale => 12, :null => false, :default => 0
  	change_column :stage_length_weights, :b, :decimal,:precision => 64, :scale => 12 , :null => false, :default => 0
  	change_column :stage_length_weights, :length_weight, :string, :default => "none exists - constant weight", :null => false
  	change_column :stage_length_weights, :datum, :string, :null => false, :default => ''
  	change_column :stage_length_weights, :user_id, :integer, :null => false
  	change_column :stage_length_weights, :project_id, :integer, :null => false
  	change_column :stage_length_weights, :mod, :boolean, :default => true
  	change_column :stage_length_weights, :approved, :boolean, :default => false
  	
  	#stage_lifestyles
  	change_column :stage_lifestyles, :citation_id, :integer, :null => false
  	change_column :stage_lifestyles, :stage_id, :integer, :null => false
  	change_column :stage_lifestyles, :lifestyle, :string, :default => "non-living", :null => false
  	change_column :stage_lifestyles, :datum, :string, :null => false, :default => ''
  	change_column :stage_lifestyles, :user_id, :integer, :null => false
  	change_column :stage_lifestyles, :project_id, :integer, :null => false
  	change_column :stage_lifestyles, :mod, :boolean, :default => true
  	change_column :stage_lifestyles, :approved, :boolean, :default => false
  	
  	# stage_masses
  	change_column :stage_masses, :citation_id, :integer, :null => false
  	change_column :stage_masses, :stage_id, :integer, :null=> false
  	change_column :stage_masses, :mass, :decimal, :precision => 64, :scale => 12,:null => false
  	change_column :stage_masses, :datum, :string, :null => false, :default => ''
  	change_column :stage_masses, :user_id, :integer, :null => false
  	change_column :stage_masses, :project_id, :integer, :null => false
  	change_column :stage_masses, :mod, :boolean, :default => true
  	change_column :stage_masses, :approved, :boolean, :default => false
  	
  	# stage_max_depths
  	change_column :stage_max_depths, :citation_id, :integer, :null => false
  	change_column :stage_max_depths, :stage_id, :integer, :null => false
  	change_column :stage_max_depths, :max_depth, :decimal,:precision => 64, :scale => 12, :null => false
  	change_column :stage_max_depths, :datum, :string, :null => false, :default => ''
  	change_column :stage_max_depths, :user_id, :integer, :null => false
  	change_column :stage_max_depths, :project_id, :integer, :null => false
  	change_column :stage_max_depths, :mod, :boolean, :default => true
  	change_column :stage_max_depths, :approved, :boolean, :default => false
  	
  	# stage_mobilities table
  	change_column :stage_mobilities, :citation_id, :integer, :null => false
  	change_column :stage_mobilities, :stage_id, :integer, :null => false
  	change_column :stage_mobilities, :datum, :string, :null => false, :default => ''
  	change_column :stage_mobilities, :mobility, :string, :null => false
  	change_column :stage_mobilities, :user_id, :integer, :null => false
  	change_column :stage_mobilities, :project_id, :integer, :null => false
  	change_column :stage_mobilities, :mod, :boolean, :default => true
  	change_column :stage_mobilities, :approved, :boolean, :default => false
  	
  	# stage_populations table
  	change_column :stage_populations, :citation_id, :integer, :null => false
  	change_column :stage_populations, :stage_id, :integer, :null => false
  	change_column :stage_populations, :population, :decimal, :precision => 64, :scale => 12, :null => false
  	change_column :stage_populations, :datum, :string, :null => false, :default => ''
  	change_column :stage_populations, :user_id, :integer, :null => false
  	change_column :stage_populations, :project_id, :integer, :null => false
  	change_column :stage_populations, :mod, :boolean, :default => true
  	change_column :stage_populations, :approved, :boolean, :default => false
  
  	#stage_prod_biomass_ratios
  	change_column :stage_prod_biomass_ratios, :citation_id, :integer, :null => false
  	change_column :stage_prod_biomass_ratios, :stage_id, :integer, :null => false
  	change_column :stage_prod_biomass_ratios, :prod_biomass_ratio, :decimal, :precision => 64, :scale => 12, :null => false
  	change_column :stage_prod_biomass_ratios, :datum, :string, :null => false, :default => ''
  	change_column :stage_prod_biomass_ratios, :user_id, :integer, :null => false
  	change_column :stage_prod_biomass_ratios, :project_id, :integer, :null => false
  	change_column :stage_prod_biomass_ratios, :mod, :boolean, :default => true
  	change_column :stage_prod_biomass_ratios, :approved, :boolean, :default => false
  
  	# stage_prod_consum_ratios
  	change_column :stage_prod_consum_ratios, :citation_id, :integer, :null => false
  	change_column :stage_prod_consum_ratios, :stage_id, :integer, :null => false
  	change_column :stage_prod_consum_ratios, :prod_consum_ratio, :decimal, :precision => 64, :scale => 12, :null => false
  	change_column :stage_prod_consum_ratios, :datum, :string, :null => false, :default => ''
  	change_column :stage_prod_consum_ratios, :user_id, :integer, :null => false
  	change_column :stage_prod_consum_ratios, :project_id, :integer, :null => false
  	change_column :stage_prod_consum_ratios, :mod, :boolean, :default => true
  	change_column :stage_prod_consum_ratios, :approved, :boolean, :default => false
  
  # stage_reproductive_strategies
  	change_column :stage_reproductive_strategies, :citation_id, :integer, :null => false
  	change_column :stage_reproductive_strategies, :stage_id, :integer, :null => false
  	change_column :stage_reproductive_strategies, :reproductive_strategy, :string, :null => false
  	change_column :stage_reproductive_strategies, :datum, :string, :null => false, :default => ''
  	change_column :stage_reproductive_strategies, :user_id, :integer, :null => false
  	change_column :stage_reproductive_strategies, :project_id, :integer, :null => false
  	change_column :stage_reproductive_strategies, :mod, :boolean, :default => true
  	change_column :stage_reproductive_strategies, :approved, :boolean, :default => false
  	
  	#stage_residencies table
  	change_column :stage_residencies, :citation_id, :integer, :null => false
  	change_column :stage_residencies, :citation_id, :integer, :null => false
  	change_column :stage_residencies, :residency, :string, :null => false
  	change_column :stage_residencies, :datum, :string, :null => false, :default => ''
  	change_column :stage_residencies, :user_id, :integer, :null => false
  	change_column :stage_residencies, :project_id, :integer, :null => false
  	change_column :stage_residencies, :mod, :boolean, :default => true
  	change_column :stage_residencies, :approved, :boolean, :default => false
  	
  	#stage_residency_times
  	change_column :stage_residency_times, :citation_id, :integer, :null => false
  	change_column :stage_residency_times, :stage_id, :integer, :null => false
  	change_column :stage_residency_times, :residency_time, :decimal, :precision => 64, :scale => 12, :null => false
  	change_column :stage_residency_times, :datum, :string, :null => false, :default => ''
  	change_column :stage_residency_times, :user_id, :integer, :null => false
  	change_column :stage_residency_times, :project_id, :integer, :null => false
  	change_column :stage_residency_times, :mod, :boolean, :default => true
  	change_column :stage_residency_times, :approved, :boolean, :default => false
  
  	# stage_unassimilated_consum_ratios
  	change_column :stage_unassimilated_consum_ratios, :citation_id,:integer, :null => false
  	change_column :stage_unassimilated_consum_ratios, :stage_id,:integer , :null => false
  	change_column :stage_unassimilated_consum_ratios, :unassimilated_consum_ratio, :decimal, :precision => 64, :scale => 12, :null => false
  	change_column :stage_unassimilated_consum_ratios, :datum, :string, :null => false, :default => ''
  	change_column :stage_unassimilated_consum_ratios, :user_id, :integer, :null => false
  	change_column :stage_unassimilated_consum_ratios, :project_id, :integer, :null => false
  	change_column :stage_unassimilated_consum_ratios, :mod, :boolean, :default => true
  	change_column :stage_unassimilated_consum_ratios, :approved, :boolean, :default => false
  	
  	# trophic_interactions
  	change_column :trophic_interactions, :stage_1_id, :integer, :null => false
  	change_column :trophic_interactions, :stage_2_id, :integer, :null => false
  	change_column :trophic_interactions, :user_id, :integer, :null => false
  	change_column :trophic_interactions, :project_id, :integer, :null => false
  	change_column :trophic_interactions, :mod, :boolean, :default => true
  	change_column :trophic_interactions, :approved, :boolean, :default => false
  	
  	# trophic_interaction_observations
  	change_column :trophic_interaction_observations, :citation_id, :integer, :null => false
  	change_column :trophic_interaction_observations, :trophic_interaction_id,:integer, :null => false
  	change_column :trophic_interaction_observations, :location_id,:integer, :null => false
  	change_column :trophic_interaction_observations, :lethality,:string, :null => false
  	change_column :trophic_interaction_observations, :structures_consumed, :string, :default => nil
  	change_column :trophic_interaction_observations, :percentage_consumed, :decimal,:precision => 64, :scale => 12 , :default => nil
  	change_column :trophic_interaction_observations, :percentage_diet_by, :string, :default => nil
  	change_column :trophic_interaction_observations, :preference, :string, :default => nil
  	change_column :trophic_interaction_observations, :percentage_diet, :decimal, :precision => 64, :scale => 12, :default => nil
  	change_column :trophic_interaction_observations, :datum, :string, :null => false, :default => ''
  	change_column :trophic_interaction_observations, :user_id, :integer, :null => false
  	change_column :trophic_interaction_observations, :project_id, :integer, :null => false
  	change_column :trophic_interaction_observations, :mod, :boolean, :default => true
  	change_column :trophic_interaction_observations, :approved, :boolean, :default => false
  end

  def down
  end
end

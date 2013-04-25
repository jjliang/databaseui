class AddCitationIdColumns < ActiveRecord::Migration
  def up
  	add_column :stages, :citation_id, :integer, :null => false
  	add_column :stage_biomass_changes, :citation_id, :integer, :null => false
  	add_column :stage_biomass_densities, :citation_id, :integer, :null => false
  	add_column :stage_consum_biomass_ratios, :citation_id, :integer, :null => false
  	add_column :stage_consumer_strategies, :citation_id, :integer, :null => false
  	add_column :stage_drymasses, :citation_id, :integer, :null => false
  	add_column :stage_durations, :citation_id, :integer, :null => false
  	add_column :stage_fecundities, :citation_id, :integer, :null => false
  	add_column :stage_habitats, :citation_id, :integer, :null => false
  	add_column :stage_length_fecundities, :citation_id, :integer, :null => false
  	add_column :stage_length_weights, :citation_id, :integer, :null => false
  	add_column :stage_lengths, :citation_id, :integer, :null => false
  	add_column :stage_lifestyles, :citation_id, :integer, :null => false
  	add_column :stage_masses, :citation_id, :integer, :null => false
  	add_column :stage_max_depths, :citation_id, :integer, :null => false
  	add_column :stage_mobilities, :citation_id, :integer, :null => false
 	add_column :stage_populations, :citation_id, :integer, :null => false
 	add_column :stage_prod_biomass_ratios, :citation_id, :integer, :null => false
 	add_column :stage_prod_consum_ratios, :citation_id, :integer, :null => false
 	add_column :stage_reproductive_strategies, :citation_id, :integer, :null => false
 	add_column :stage_residencies, :citation_id, :integer, :null => false
  	add_column :stage_residency_times, :citation_id, :integer, :null => false
  	add_column :stage_unassimilated_consum_ratios, :citation_id, :integer, :null => false
  	add_column :stage_habitat_descriptors, :citation_id, :integer, :null => false
  end

  def down
  end
end

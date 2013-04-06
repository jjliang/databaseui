class Citation < ActiveRecord::Base
  attr_accessible :abstract, :closed, :document, :format, :format_title, :number, :pages, :publisher, :title, :user_id, :volume, :year, :mod, :project_id, :approved
  belongs_to :user
  belongs_to :project
  has_many :author_cites
  has_many :authors, :through => :author_cites
  has_many :competition_interaction_observations
  has_many :facilitation_interaction_observations
  has_many :node_max_ages
  has_many :node_ranges
  has_many :parasitic_interaction_observations
  has_many :stages
  has_many :stage_biomass_changes
  has_many :stage_biomass_densities
  has_many :stage_consum_biomass_ratios
  has_many :stage_consumer_strategies
  has_many :stage_drymasses
  has_many :stage_durations
  has_many :stage_fecundities
  has_many :stage_habitats
  has_many :stage_habitat_descriptors
  has_many :stage_lengths
  has_many :stage_length_fecundities
  has_many :stage_length_weights
  has_many :stage_lifestyles
  has_many :stage_masses
  has_many :stage_max_depths
  has_many :stage_mobilities
  has_many :stage_populations
  has_many :stage_prod_biomass_ratios
  has_many :stage_prod_consum_ratios
  has_many :stage_reproductive_strategies
  has_many :stage_residencies
  has_many :stage_residency_times
  has_many :stage_unassimilated_consum_ratios
  has_many :trophic_interaction_observations
end

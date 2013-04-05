class Stage < ActiveRecord::Base
  attr_accessible :node_id, :user_id
  belongs_to :node
  belongs_to :user
  has_one :stage_biomass_change, :dependent => :destroy
  has_one :stage_biomass_density, :dependent => :destroy
  has_one :stage_consum_biomass_ratio, :dependent => :destroy
  has_one :stage_consumer_strategy, :dependent => :destroy
  has_one :stage_drymass, :dependent => :destroy
  has_one :stage_duration, :dependent => :destroy
  has_one :stage_fecundity, :dependent => :destroy
  has_one :stage_habitat, :dependent => :destroy
  has_one :stage_length_fecundity, :dependent => :destroy
  has_one :stage_length_weight, :dependent => :destroy
  has_one :stage_length, :dependent => :destroy
  has_one :stage_lifestyle, :dependent => :destroy
  has_one :stage_mass, :dependent => :destroy
  has_one :stage_max_depth, :dependent => :destroy
  has_one :stage_mobility, :dependent => :destroy
  has_one :stage_population, :dependent => :destroy
  has_one :stage_prod_biomass_ratio, :dependent => :destroy
  has_one :stage_prod_consum_ratio, :dependent => :destroy
  has_one :stage_reproductive_strategy, :dependent => :destroy
  has_one :stage_residency, :dependent => :destroy
  has_one :stage_residency_time, :dependent => :destroy
  has_one :stage_unassimilated_consum_ratio, :dependent => :destroy
end

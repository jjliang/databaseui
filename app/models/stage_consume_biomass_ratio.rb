class StageConsumeBiomassRatio < ActiveRecord::Base
  attr_accessible :cite_id, :comment, :consume_biomass_ratio, :datum, :stage_id, :user_id
  belongs_to :citation
  belongs_to :stage
  belongs_to :user
end

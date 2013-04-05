class StageBiomassChange < ActiveRecord::Base
  attr_accessible :biomass_change, :citation_id, :comment, :datum, :stage_id, :user_id
  belongs_to :citation
  belongs_to :stage
  belongs_to :user
end

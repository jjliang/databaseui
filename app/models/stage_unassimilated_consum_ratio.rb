class StageUnassimilatedConsumRatio < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :stage_id, :unassimilated_consum_ratio, :user_id
  belongs_to :citation
  belongs_to :stage
  belongs_to :user
end

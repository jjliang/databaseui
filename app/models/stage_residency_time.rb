class StageResidencyTime < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :residency_time, :stage_id, :user_id
  belongs_to :citation
  belongs_to :stage
  belongs_to :user
end

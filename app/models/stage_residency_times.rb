class StageResidencyTimes < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :residency_time, :stage_id, :user_id
  has_many :citations
  belongs_to :stage, :user
end

class StageDurations < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :duration, :stage_id, :user_id
  has_many :citations
  belongs_to :stage, :user
end

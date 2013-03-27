class StageResidency < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :stage_id, :user_id
  has_many :citations
  belongs_to :stage, :user
end

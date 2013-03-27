class StageDrymass < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :drymass, :stage_id, :user_id
  has_many :citations
  belongs_to :stage, :user
end

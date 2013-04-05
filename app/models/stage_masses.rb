class StageMasses < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :mass, :stage_id, :user_id
  belongs_to :citations
  belongs_to :stage
  belongs_to :user
end

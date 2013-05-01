class CompetitionInteraction < ActiveRecord::Base

  attr_accessible :stage_1_id, :stage_2_id, :user_id, :project_id, :mod , :approved
  belongs_to :user
  belongs_to :project
  has_many :competition_interaction_observations, :dependent => :destroy
end

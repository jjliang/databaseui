class CompetitionInteraction < ActiveRecord::Base
  attr_accessible :stage_1_id, :stage_2_id, :user_id
  belongs_to :user
  has_may :competition_interaction_observations, :dependent => :destroy
end

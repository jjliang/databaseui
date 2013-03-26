class CompetitionInteractions < ActiveRecord::Base
  attr_accessible :stage_1_id, :stage_2_id, :user_id
  belongs_to :user
end

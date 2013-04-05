class StageConsumerStrategy < ActiveRecord::Base
  attr_accessible :cite_id, :comment, :consumer_strategy, :datum, :stage_id, :user_id
  belongs_to :citation
  belongs_to :stage
  belongs_to :user
end

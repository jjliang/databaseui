class StageLengthWeight < ActiveRecord::Base
  attr_accessible :a, :b, :cite_id, :comment, :datum, :length_weight, :stage_id, :user_id
  belongs_to :citation
  belongs_to :stage
  belongs_to :user
end

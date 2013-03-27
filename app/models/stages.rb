class Stages < ActiveRecord::Base
  attr_accessible :node_id, :user_id
  belongs_to :node, :user
end

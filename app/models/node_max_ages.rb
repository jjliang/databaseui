class NodeMaxAges < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :max_age, :node_id, :user_id
end

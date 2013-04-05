class NonItis < ActiveRecord::Base
  attr_accessible :info, :latin_name, :parent_id, :parent_id_is_itis, :user_id
  belongs_to :node
  belongs_to :user  
end

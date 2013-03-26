class Authors < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :user_id
  belongs_to :user
  belongs_to :author_cite, :dependent => :destroy
end

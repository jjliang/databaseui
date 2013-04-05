class Author < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :user_id
  belongs_to :user
  has_many :author_cites
  has_many :citations, :through => :author_cites, :dependent => :destroy
end


class Citations < ActiveRecord::Base
  attr_accessible :abstract, :closed, :document, :format_title, :number, :pages, :publisher, :title, :user_id, :volume, :year
  belongs_to :user
  has_many :author_cites
  has_many :authors, :through => :author_cites
end
 
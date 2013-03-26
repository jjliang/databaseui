class Citations < ActiveRecord::Base
  attr_accessible :abstract, :closed, :document, :format_title, :number, :pages, :publisher, :title, :user_id, :volume, :year
  belongs_to :authors_cite, :dependent => :destroy
  belongs_to :user
end

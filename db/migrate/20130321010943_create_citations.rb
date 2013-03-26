class CreateCitations < ActiveRecord::Migration
  def change
    create_table :citations do |t|
      t.string :title
      t.string :document
      t.integer :year
      t.text :abstract
      t.string :format_title
      t.string :publisher
      t.integer :number
      t.integer :volume
      t.string :pages
      t.boolean :closed
      t.integer :user_id

      t.timestamps
    end
  end
end

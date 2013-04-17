class CreateForums < ActiveRecord::Migration
  def change
    create_table :forums do |t|
      t.string :name
      t.string :title
      t.text :comment

      t.timestamps
    end
  end
end

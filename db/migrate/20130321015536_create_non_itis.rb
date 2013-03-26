class CreateNonItis < ActiveRecord::Migration
  def change
    create_table :non_itis do |t|
      t.integer :parent_id
      t.string :latin_name
      t.boolean :parent_id_is_itis
      t.text :info
      t.integer :user_id

      t.timestamps
    end
  end
end

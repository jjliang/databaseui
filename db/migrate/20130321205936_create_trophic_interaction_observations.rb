class CreateTrophicInteractionObservations < ActiveRecord::Migration
  def change
    create_table :trophic_interaction_observations do |t|
      t.integer :citation_id
      t.integer :trophic_interaction_id
      t.integer :location_id
      t.float :percentage_consumed
      t.float :percentage_diet
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end

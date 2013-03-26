class CreateParasiticInteractionObservations < ActiveRecord::Migration
  def change
    create_table :parasitic_interaction_observations do |t|
      t.integer :citation_id
      t.integer :parasitic_interaction_id
      t.integer :location_id
      t.float :prevalence
      t.float :intensity
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end

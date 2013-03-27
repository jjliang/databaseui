class CreateStageBiomassChanges < ActiveRecord::Migration
  def change
    create_table :stage_biomass_changes do |t|
      t.integer :citation_id
      t.integer :stage_id
      t.float :biomass_change
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end

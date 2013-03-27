class CreateFunctionalGroups < ActiveRecord::Migration
  def change
    create_table :functional_groups do |t|
      t.string :name

      t.timestamps
    end
  end
end

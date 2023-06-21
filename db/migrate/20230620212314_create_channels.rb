class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.string :name, null:false 
      t.references :workspace, null: false, foreign_key: {to_table: :workspaces}
      t.references :owner, null: false, foreign_key: {to_table: :users}
      t.string :description

      t.timestamps
    end
    add_index :channels, :name, unique: true
  end
end

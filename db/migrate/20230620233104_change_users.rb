class ChangeUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :full_name
    change_column_null :users, :display_name, false
  end
end

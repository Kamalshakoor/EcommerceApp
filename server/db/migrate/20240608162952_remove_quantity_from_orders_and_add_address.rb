class RemoveQuantityFromOrdersAndAddAddress < ActiveRecord::Migration[6.1]
  def change
    remove_column :orders, :quantity, :integer
    add_column :orders, :address, :string
  end
end

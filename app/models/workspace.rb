# == Schema Information
#
# Table name: workspaces
#
#  id         :bigint           not null, primary key
#  name       :string
#  owner_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Workspace < ApplicationRecord
    belongs_to :owner,
        class_name: 'User',
        foreign_key: 'owner_id'
    
    has_many :workspace_subscriptions,
        dependent: :destroy
    
    has_many :channels,
        dependent: :destroy

    has_many :direct_messages,
        dependent: :destroy

    has_many :users,
        through: :workspace_subscriptions

end

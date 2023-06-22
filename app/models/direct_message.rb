# == Schema Information
#
# Table name: direct_messages
#
#  id           :bigint           not null, primary key
#  workspace_id :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class DirectMessage < ApplicationRecord
  belongs_to :workspace

  has_many :user_direct_messages,
    dependent: :destroy

  has_many :direct_message_subscriptions,
    dependent: :destroy

  has_many :messages, as: :messageable

  has_many :users,
    through: :direct_message_subscriptions
end

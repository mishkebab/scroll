# == Schema Information
#
# Table name: direct_message_subscriptions
#
#  id                :bigint           not null, primary key
#  user_id           :bigint           not null
#  direct_message_id :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class DirectMessageSubscription < ApplicationRecord
  belongs_to :user
  belongs_to :direct_message
end

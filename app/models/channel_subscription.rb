# == Schema Information
#
# Table name: channel_subscriptions
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  channel_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ChannelSubscription < ApplicationRecord
  belongs_to :user
  belongs_to :channel
end

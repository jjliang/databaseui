class Feedback
  attr_accessor :subject, :email, :comment, :page

  def initialize(params = {})
    self.subject = params[:subject]
    self.email = params[:email]
    self.comment = params[:comment]
    self.page = params[:page]
  end

  def valid?
    self.comment && !self.comment.strip.blank?
  end

	def feedback(feedback)
    @recipients = 'you@yoursite.com'
    @from = 'system@yoursite.com'
    @subject = "[Feedback for YourSite.com] #{feedback.subject}"
	end
end

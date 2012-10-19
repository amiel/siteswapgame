module ApplicationHelper
  def body_class
    "#{controller.controller_name} #{controller.controller_name}-#{controller.action_name}"
  end

  def render_title
    'Site Swap Game'
  end

  def title(str)
    @_title = str
  end

  def javascript(name)
    content_for(:javascript) { javascript_include_tag name }
  end

  def stylesheet(name)
    content_for(:head) { stylesheet_link_tag name }
  end

end

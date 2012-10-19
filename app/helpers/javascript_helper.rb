module JavascriptHelper
    def js_vars_with_scope(scope)
    @_js_var_scope = scope
    yield
    @_js_var_scope = nil
  end

  def js_var(key, value, scope = @_js_var_scope)
    content_for(:in_javascript) { "Base.reg(#{ key.to_json }, #{ value.to_json }#{ ", " + scope.to_json if scope });".html_safe }
  end

  def include_jquery_from_google
    javascript_include_tag('http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js')
  end
end

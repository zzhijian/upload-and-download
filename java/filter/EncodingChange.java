package java.filter;
import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * EncodingChange概要说明：
 * @author zhangzhijian
 */
public class EncodingChange implements Filter {
	protected String encoding = null;
	protected FilterConfig filterconfig = null;
	protected boolean ignore = true;

	public void destroy() {
		this.encoding = null;
		this.filterconfig = null;
	}
    /**设置编码***/
	public void doFilter(ServletRequest requests, ServletResponse responses,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) requests;
		HttpServletResponse response = (HttpServletResponse) responses;
		if (ignore || request.getCharacterEncoding() == null) {
			String encoding = selectEncoding(request);
			if (encoding != null) {
				request.setCharacterEncoding(encoding);
			}
		}
		chain.doFilter(request, response);
	}
    /***初始化**/
	public void init(FilterConfig filterconfig) throws ServletException {
		this.filterconfig = filterconfig;
		this.encoding = filterconfig.getInitParameter("encoding");
		String value = filterconfig.getInitParameter("ignore");
		if (value == null) {
			this.ignore = true;
		} else if (value.equalsIgnoreCase("true")) {
			this.ignore = true;
		} else if (value.equalsIgnoreCase("yes")) {
			this.ignore = true;
		} else {
			this.ignore = false;
		}
	}

	public String selectEncoding(ServletRequest request) {
		return this.encoding;
	}
}
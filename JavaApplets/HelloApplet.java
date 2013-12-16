import java.awt.*;
import java.applet.*;

/**
 * java applet
 * 
 * @author zhangbiao
 */
public class HelloApplet extends Applet {
	public void paint(Graphics g) {
		// g = this.g;
		g.drawString("Hello", 10, 10);
		g.drawString("Welcome to Applet Programming!", 30, 30);
	}
	
	public void init() {
		super.init();
	}
	
	public void start() {
		super.start();
	}
	
	public void stop() {
		super.stop();
	}
	
	public void destroy() {
		super.destroy();
	}
}
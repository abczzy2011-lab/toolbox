import javax.swing.*;
import java.awt.*;
import java.awt.geom.*;
import java.awt.image.*;
import java.util.ArrayList;
import java.util.Random;

public class ParticleHeart extends JPanel {
    private static final int WIDTH = 1000;
    private static final int HEIGHT = 800;
    private static final int PARTICLE_COUNT = 800;
    private static final double HEART_SCALE = 12.0;

    private final java.util.List<Particle> particles = new ArrayList<>();
    private final Random random = new Random();
    private double beatPhase = 0;
    private long lastTime = System.currentTimeMillis();

    public ParticleHeart() {
        setBackground(Color.BLACK);
        initParticles();
    }

    // 心形参数方程
    private double heartX(double t) {
        return 16 * Math.pow(Math.sin(t), 3);
    }

    private double heartY(double t) {
        return -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    }

    private void initParticles() {
        for (int i = 0; i < PARTICLE_COUNT; i++) {
            // 随机分布在心形曲线上
            double t = random.nextDouble() * Math.PI * 2;
            double hx = heartX(t);
            double hy = heartY(t);

            // 在心形内部也撒一些粒子，让爱心更饱满
            if (random.nextDouble() < 0.35) {
                // 在心形内部随机点
                double shrink = 0.3 + random.nextDouble() * 0.7;
                hx *= shrink;
                hy *= shrink;
            }

            double targetX = WIDTH / 2.0 + hx * HEART_SCALE;
            double targetY = HEIGHT / 2.0 + hy * HEART_SCALE;

            // 粒子从屏幕外随机位置飞入
            double startX = random.nextDouble() * WIDTH;
            double startY = random.nextDouble() * HEIGHT;

            Particle p = new Particle(startX, startY, targetX, targetY);
            p.delay = random.nextInt(60);
            particles.add(p);
        }
    }

    private double getBeatScale() {
        // 心跳模拟：快速收缩 + 缓慢恢复，用多个正弦叠加模拟真实心跳
        beatPhase += 0.06;
        double beat = Math.sin(beatPhase) * 0.5 + Math.sin(beatPhase * 2) * 0.3;
        beat = beat * beat; // 平方让节奏更有脉冲感
        return 1.0 + beat * 0.12;
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g;
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);

        double scale = getBeatScale();
        double cx = WIDTH / 2.0;
        double cy = HEIGHT / 2.0;

        // 绘制每颗粒子
        for (Particle p : particles) {
            if (p.delay > 0) { p.delay--; continue; }
            p.update(cx, cy, scale);

            // 颜色：红色系，根据速度微调亮度
            int alpha = (int) (180 + 75 * p.life);
            int red = 200 + (int) (55 * p.life);
            int green = (int) (20 * (1 - p.speedFactor));
            int blue = (int) (30 * (1 - p.speedFactor));

            g2.setColor(new Color(red, green, blue, Math.min(alpha, 255)));

            // 发光效果：先画一个较大的半透明圆
            double glowSize = p.size * (2.0 + p.speedFactor * 2.0);
            GradientPaint glow = new GradientPaint(
                (float) p.x, (float) p.y,
                new Color(red, green, blue, 60),
                (float) p.x, (float) p.y,
                new Color(red, green, blue, 0)
            );
            // 使用纯色发光代替渐变，性能更好
            g2.setColor(new Color(red, green, blue, 50));
            g2.fill(new Ellipse2D.Double(p.x - glowSize, p.y - glowSize, glowSize * 2, glowSize * 2));

            // 粒子本体
            g2.setColor(new Color(red, green, blue, alpha));
            g2.fill(new Ellipse2D.Double(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2));
        }

        // 中心高光
        float glowAlpha = (float) (0.15 + 0.05 * Math.sin(beatPhase));
        RadialGradientPaint centerGlow = new RadialGradientPaint(
            (float) cx, (float) cy, WIDTH * 0.25f,
            new float[]{0f, 1f},
            new Color[]{new Color(255, 80, 80, (int) (glowAlpha * 255)), new Color(0, 0, 0, 0)}
        );
        g2.setPaint(centerGlow);
        g2.fill(new Ellipse2D.Double(cx - WIDTH * 0.25, cy - WIDTH * 0.25, WIDTH * 0.5, WIDTH * 0.5));

        repaint();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("💗 粒子爱心 - Particle Heart");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(WIDTH, HEIGHT);
            frame.setLocationRelativeTo(null);
            frame.setResizable(false);
            frame.add(new ParticleHeart());
            frame.setVisible(true);
        });
    }

    static class Particle {
        double x, y;
        double targetX, targetY;
        double vx, vy;
        double size;
        double life = 1.0;
        double speedFactor = 0;
        int delay = 0;

        Particle(double sx, double sy, double tx, double ty) {
            this.x = sx;
            this.y = sy;
            this.targetX = tx;
            this.targetY = ty;
            this.size = 1.5 + Math.random() * 2.5;
        }

        void update(double cx, double cy, double scale) {
            // 计算目标位置（带心跳缩放）
            double dx = targetX - cx;
            double dy = targetY - cy;
            double finalX = cx + dx * scale;
            double finalY = cy + dy * scale;

            // 弹簧物理效果：向目标位置加速
            double ax = (finalX - x) * 0.04;
            double ay = (finalY - y) * 0.04;

            vx += ax;
            vy += ay;
            vx *= 0.88;
            vy *= 0.88;

            x += vx;
            y += vy;

            // 计算速度因子用于颜色变化
            double dist = Math.sqrt((x - finalX) * (x - finalX) + (y - finalY) * (y - finalY));
            speedFactor = Math.min(dist / 50.0, 1.0);

            // 在目标位置附近有微小抖动
            if (dist < 5) {
                x += (Math.random() - 0.5) * 1.5;
                y += (Math.random() - 0.5) * 1.5;
            }

            life = 0.5 + speedFactor * 0.5;
        }
    }
}

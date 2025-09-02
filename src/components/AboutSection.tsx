import Icon from '@/components/ui/icon';

export default function AboutSection() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-8 relative pt-0">
        <span className="relative inline-block">
          <span className="text-2xl font-bold relative z-10 text-primary">О</span>
          <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.1) 100%)',
            top: '-1px',
            left: '-10px'
          }}></div>
        </span>бо мне
      </h2>
      <p className="text-muted-foreground leading-relaxed text-base">
        Магия пришла в мою жизнь очень рано. Я не понимала, как с этим справляться и как это контролировать. Не могла рассказать, что чувствую внутри. Думала, от меня откажутся.<br/><br/>Уже с возрастом стала осознавать, что могу быть нужной, могу помогать людям и получать от них позитивную энергию, которая питает меня, как батарея питает теплом холодный дом.<br/><br/>Мои дорогие сестры, товарищи, не стесняйтесь просить помощи, ведь наша сила в единстве. Постараюсь помочь вам, чем смогу. Делаю все, что в моих силах.
      </p>
    </div>
  );
}
import Icon from '@/components/ui/icon';

export default function AboutSection() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6 relative">
        <span className="relative inline-block">
          <span className="text-2xl font-bold relative z-10" style={{color: '#ff9800'}}>О</span>
          <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
            background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0.1) 100%)',
            top: '-1px',
            left: '-10px'
          }}></div>
        </span>бо мне
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Магия пришла в мою жизнь очень рано. Я не понимала, как с этим справляться и как это контролировать. Не могла рассказать, что чувствую внутри. Думала, от меня откажутся. Уже с возрастом стала осознавать, что могу быть нужной, могу помогать людям и получать от них позитивную энергию, которая питает меня, как батарея питает теплом холодный дом. Мои дорогие сестры, товарищи, не стесняйтесь просить помощи, ведь наша сила в единстве. Постараюсь помочь вам, чем смогу. Делаю все, что в моих силах.
      </p>
    </div>
  );
}
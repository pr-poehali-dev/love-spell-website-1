export default function Divider() {
  return (
    <div className="h-6 bg-gradient-to-r from-background via-border/30 to-background relative overflow-hidden">
      {/* Декоративный градиент */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent"></div>
      {/* Тонкая линия по центру */}
      <div className="absolute top-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-border to-transparent transform -translate-y-1/2"></div>
    </div>
  );
}
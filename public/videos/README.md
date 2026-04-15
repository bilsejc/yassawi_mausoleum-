# Папка для видео

Поместите сюда следующие файлы:

## Необходимые видео:
- `mountain-hero.mp4` - главное видео для hero секции

## Требования для GitHub:
- Формат: MP4
- Кодек: H.264
- Максимальный размер: 100MB
- Рекомендуемый размер: 20-50MB
- Длительность: 15-30 секунд
- Разрешение: 1920x1080 или 1280x720

## Сжатие видео:

### Используя FFmpeg:
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k -movflags +faststart mountain-hero.mp4
```

### Онлайн сервисы:
- CloudConvert.com
- FreeConvert.com
- Online-Convert.com

### Программы:
- HandBrake (бесплатно)
- VLC (встроенный конвертер)
- Adobe Media Encoder

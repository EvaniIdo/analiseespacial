# --- Análise Exploratória de Dados (EDA) - IPS Brasil 2025 ---
# Carregar bibliotecas necessárias
library(tidyverse)

# 1. Carregamento dos Dados
# Correção: Barras invertidas para barras normais (/)
# Dica: read.csv2() geralmente é melhor para CSVs brasileiros separados por ponto e vírgula
dados <- read.csv("C:/Users/aluno/Downloads/IPSBrasil2025.csv", stringsAsFactors = FALSE, encoding = "UTF-8")

# 2. Limpeza e Tratamento de Dados
dados_limpos <- dados %>%
  mutate(
    IPS = as.numeric(str_replace(Índice.de.Progresso.Social, ",", ".")),
    # Correção: Remove os pontos (milhar) primeiro, depois troca a vírgula (decimal) por ponto
    PIB_capita = as.numeric(str_replace(str_remove_all(PIB.per.capita.2021, "\\."), ",", ".")),
    UF = as.factor(UF)
  ) %>%
  filter(!is.na(IPS) & !is.na(PIB_capita)) # Removendo NAs de ambas as variáveis usadas

# 3. Estatísticas Descritivas
resumo_estatistico <- dados_limpos %>%
  summarise(
    Media_IPS = mean(IPS),
    Mediana_IPS = median(IPS),
    Min_IPS = min(IPS),
    Max_IPS = max(IPS),
    Desvio_Padrao = sd(IPS)
  )
print(resumo_estatistico)

# 4. Visualizações com ggplot2

# Gráfico 1: Distribuição do IPS
ggplot(dados_limpos, aes(x = IPS)) +
  geom_histogram(aes(y = after_stat(density)), bins = 30, fill = "skyblue", color = "white") +
  geom_density(color = "darkblue", linewidth = 1) +
  theme_minimal() +
  labs(title = "Distribuição do Índice de Progresso Social (IPS)",
       subtitle = "Frequência dos índices entre os municípios brasileiros",
       x = "IPS", y = "Densidade")

# Preparação de dados para o Gráfico 2
media_nacional <- mean(dados_limpos$IPS, na.rm = TRUE)
maior_mun <- dados_limpos %>% filter(IPS == max(IPS, na.rm = TRUE))
menor_mun <- dados_limpos %>% filter(IPS == min(IPS, na.rm = TRUE))

texto_rodape <- paste0(
  "Média Nacional: ", round(media_nacional, 2), "\n",
  "Maior: ", maior_mun$Município[1], " - ", maior_mun$UF[1], " (", round(maior_mun$IPS[1], 2), ") | ",
  "Menor: ", menor_mun$Município[1], " - ", menor_mun$UF[1], " (", round(menor_mun$IPS[1], 2), ")"
)

# Gráfico 2: Média de IPS por Estado (UF)
media_por_uf <- dados_limpos %>%
  group_by(UF) %>%
  summarise(Media_IPS = mean(IPS, na.rm = TRUE)) %>%
  arrange(desc(Media_IPS))

ggplot(media_por_uf, aes(x = reorder(UF, -Media_IPS), y = Media_IPS, fill = Media_IPS)) +
  geom_bar(stat = "identity") +
  geom_hline(yintercept = media_nacional, color = "red", linetype = "dashed", linewidth = 1) +
  scale_fill_viridis_c() +
  theme_minimal() +
  labs(title = "Média de IPS por Estado",
       subtitle = "A linha tracejada vermelha indica a Média Nacional",
       x = "Estado (UF)", y = "IPS Médio",
       caption = texto_rodape) +
  theme(legend.position = "none",
        plot.caption = element_text(hjust = 0.5, size = 11, face = "bold", color = "#333333", margin = margin(t = 15)))

# Preparação: Calcular a correlação exata (usando log do PIB para alinhar com o gráfico)
correlacao <- cor(log10(dados_limpos$PIB_capita), dados_limpos$IPS, use = "complete.obs")

# Gráfico 3: Correlação entre PIB per capita e IPS (Alta Qualidade)
ggplot(dados_limpos, aes(x = PIB_capita, y = IPS)) +
  
  # Pontos semi-transparentes para lidar com a sobreposição de muitas cidades
  geom_point(alpha = 0.4, color = "#4C72B0", size = 1.5) +
  
  # Linha de tendência mais elegante (tracejada escurecida) com intervalo de confiança cinza
  geom_smooth(method = "lm", color = "darkred", linetype = "dashed", linewidth = 1, se = TRUE) +
  
  # Escala logarítmica com rótulos de números legíveis (ex: 10.000, 100.000)
  scale_x_log10(labels = scales::label_number(big.mark = ".", decimal.mark = ",")) +
  
  # Tema limpo padrão para documentos
  theme_bw(base_size = 14) +
  
  # Textos e rótulos explicativos
  labs(
    title = "Relação entre Desempenho Econômico e Progresso Social",
    subtitle = paste0("Escala logarítmica no Eixo X | Correlação (R) = ", round(correlacao, 2)),
    x = "PIB per capita (R$ - 2021)", 
    y = "Índice de Progresso Social (IPS)"
  ) +
  
  # Limpeza das linhas de grade menores
  theme(
    panel.grid.minor = element_blank(),
    plot.subtitle = element_text(color = "#555555", face = "italic")
  )

# 1. Carregue o pacote de interatividade
library(plotly)

# 2. Recriamos o Gráfico 3 adicionando a variável 'text' dentro do aes()
grafico3_base <- ggplot(dados_limpos, aes(x = PIB_capita, y = IPS, 
                                          # Aqui configuramos exatamente o que aparece ao passar o mouse
                                          text = paste("Município:", Município, "-", UF,
                                                       "<br>PIB per capita: R$", PIB_capita,
                                                       "<br>IPS:", round(IPS, 2)))) +
  
  geom_point(alpha = 0.4, color = "#4C72B0", size = 1.5) +
  geom_smooth(method = "lm", color = "darkred", linetype = "dashed", linewidth = 1, se = TRUE) +
  scale_x_log10(labels = scales::label_number(big.mark = ".", decimal.mark = ",")) +
  theme_bw(base_size = 14) +
  labs(
    title = "Relação entre Desempenho Econômico e Progresso Social",
    x = "PIB per capita (R$ - 2021)", 
    y = "Índice de Progresso Social (IPS)"
  )

# 3. A Mágica: transforma o ggplot em um gráfico interativo
grafico3_interativo <- ggplotly(grafico3_base, tooltip = "text")

# 4. Exibe o gráfico interativo na aba "Viewer" do RStudio
grafico3_interativo
